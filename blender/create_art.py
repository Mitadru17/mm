import bpy, math, os, json
from mathutils import Vector

ROOT = r'D:\code\MYSTIC'
OUT = os.path.join(ROOT, 'public', 'art')
SOURCE = os.path.join(ROOT, 'blender')
os.makedirs(OUT, exist_ok=True)

def setup(name, width, height):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.name = name
    scene.unit_settings.system = 'METRIC'
    for cname in ['COL_Artwork', 'COL_Cameras', 'COL_Lights']:
        col = bpy.data.collections.new(cname)
        scene.collection.children.link(col)
    scene.render.engine = 'CYCLES'
    scene.cycles.samples = 32
    scene.cycles.use_denoising = True
    scene.render.resolution_x = width
    scene.render.resolution_y = height
    scene.render.resolution_percentage = 100
    scene.render.film_transparent = True
    scene.render.image_settings.file_format = 'PNG'
    scene.render.image_settings.color_mode = 'RGBA'
    scene.world = bpy.data.worlds.new('WORLD_Studio')
    scene.world.use_nodes = True
    scene.world.node_tree.nodes['Background'].inputs[0].default_value = (.52,.48,.39,1)
    scene.world.node_tree.nodes['Background'].inputs[1].default_value = .65
    scene.view_settings.view_transform = 'AgX'
    return scene

def put(obj, collection):
    for col in list(obj.users_collection): col.objects.unlink(obj)
    bpy.data.collections[collection].objects.link(obj)
    return obj

def metal(name, color, roughness):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get('Principled BSDF')
    bsdf.inputs['Base Color'].default_value = (*color,1)
    bsdf.inputs['Metallic'].default_value = .85
    bsdf.inputs['Roughness'].default_value = roughness
    return mat

def mesh(name, verts, faces, material, parent=None):
    data=bpy.data.meshes.new(name)
    data.from_pydata(verts, [], faces)
    data.update()
    obj=bpy.data.objects.new(name,data)
    bpy.data.collections['COL_Artwork'].objects.link(obj)
    obj.data.materials.append(material)
    obj.parent=parent
    for p in data.polygons:p.use_smooth=True
    return obj

def ellipsoid(name, loc, scale, material, parent=None, rotation=(0,0,0)):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=20, ring_count=10, location=loc)
    obj=put(bpy.context.object,'COL_Artwork')
    obj.name=name
    obj.scale=scale
    obj.rotation_euler=rotation
    obj.parent=parent
    obj.data.materials.append(material)
    for p in obj.data.polygons:p.use_smooth=True
    return obj

def camera(loc, target, scale):
    bpy.ops.object.camera_add(location=loc)
    obj=put(bpy.context.object,'COL_Cameras')
    obj.name='CAM_Artwork_Hero'
    obj.rotation_euler=(Vector(target)-obj.location).to_track_quat('-Z','Y').to_euler()
    obj.data.type='ORTHO'
    obj.data.ortho_scale=scale
    bpy.context.scene.camera=obj

def lights():
    for name,loc,energy,size,color in [('Key',(-3,-4,7),1600,5,(1,.84,.61)),('Fill',(4,1,4),1100,5,(.75,.85,1)),('Rim',(0,5,5),2000,4,(1,.93,.75))]:
        bpy.ops.object.light_add(type='AREA',location=loc)
        obj=put(bpy.context.object,'COL_Lights')
        obj.name='LGT_'+name
        obj.data.energy=energy
        obj.data.shape='DISK'
        obj.data.size=size
        obj.data.color=color
        obj.rotation_euler=(-obj.location).to_track_quat('-Z','Y').to_euler()

def save_and_render(name):
    scene=bpy.context.scene
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(SOURCE,name+'.blend'))
    for obj in bpy.context.selected_objects:obj.select_set(False)
    for obj in bpy.data.collections['COL_Artwork'].objects:obj.select_set(True)
    bpy.ops.export_scene.gltf(filepath=os.path.join(OUT,name+'.glb'),use_selection=True,export_format='GLB',export_cameras=False,export_lights=False)
    scene.render.filepath=os.path.join(OUT,name+'.png')
    scene.render.resolution_percentage=40
    bpy.ops.render.render(write_still=True)
    os.replace(scene.render.filepath,os.path.join(SOURCE,name+'-preview.png'))
    scene.render.resolution_percentage=100
    bpy.ops.render.render(write_still=True)
    stats={'objects':len(bpy.data.collections['COL_Artwork'].objects),'triangles':sum(sum(len(p.vertices)-2 for p in o.data.polygons) for o in bpy.data.collections['COL_Artwork'].objects if o.type=='MESH'),'materials':len(bpy.data.materials),'resolution':[scene.render.resolution_x,scene.render.resolution_y]}
    with open(os.path.join(SOURCE,name+'-validation.json'),'w') as f:json.dump(stats,f,indent=2)
    print('MYSTIC_ART_READY',name,stats,flush=True)

scene=setup('Mystic_Bronze_Swallows',1200,650)
gold=metal('MAT_Bronze_Warm',(.57,.34,.105),.3)
for i,(loc,rz,s) in enumerate([((-1.8,.1,.3),-.48,.92),((.2,.4,.9),.27,1.05),((2,-.45,-.25),-.12,.8)]):
    parent=bpy.data.objects.new('EMPTY_Swallow_'+str(i),None)
    bpy.data.collections['COL_Artwork'].objects.link(parent)
    parent.location=loc
    parent.rotation_euler=(.1*(i-1),-.15*(i-1),rz)
    parent.scale=(s,s,s)
    ellipsoid('BODY_'+str(i),(0,0,0),(.17,.6,.17),gold,parent)
    ellipsoid('HEAD_'+str(i),(0,.52,.075),(.15,.19,.15),gold,parent)
    mesh('BEAK_'+str(i),[(-.075,.66,.09),(.075,.66,.09),(0,.98,.04),(0,.67,.16)],[(0,1,2),(0,2,3),(1,3,2),(0,3,1)],gold,parent)
    for side in [-1,1]:
        verts=[];faces=[]
        ns,nv=20,7
        for a in range(ns+1):
            t=a/ns
            for b in range(nv+1):
                v=b/nv
                x=side*(.08+1.55*t)
                y=.12-.66*t-(.69*(1-t)+.10)*v
                z=.1+.52*math.sin(t*1.6)+.07*math.sin(v*math.pi)
                verts.append((x,y,z))
        for a in range(ns):
            for b in range(nv):
                q=a*(nv+1)+b
                faces.append((q,q+1,q+nv+2,q+nv+1))
        wing=mesh('WING_'+str(i)+'_'+str(side),verts,faces,gold,parent)
        solid=wing.modifiers.new('Feather thickness','SOLIDIFY');solid.thickness=.025
        for f in range(11):
            t=.28+f*.065
            x=side*(.08+1.55*t)
            y=.12-.66*t-.45*(1-t)
            z=.1+.52*math.sin(t*1.6)
            ellipsoid('FEATHER_'+str(i)+'_'+str(side)+'_'+str(f),(x,y-.18,z),(.055,.31*(1-t)+.13,.026),gold,parent,rotation=(.02,0,-side*.28))
        mesh('TAIL_'+str(i)+'_'+str(side),[(0,-.4,.0),(side*.18,-.5,.03),(side*.36,-1.13,.1),(0,-.76,-.02)],[(0,1,2,3)],gold,parent)
camera((3.0,-5.5,7.5),(0,0,.35),8.6)
lights()
save_and_render('bronze-swallows')

scene=setup('Mystic_Abstract_Mountain_Relief',1400,1000)
gold=metal('MAT_Bronze_Relief',(.38,.29,.15),.47)
edge=metal('MAT_Brass_Edge',(.65,.43,.18),.31)
bpy.ops.mesh.primitive_cylinder_add(vertices=192,radius=3.1,depth=.24,location=(0,0,-.14))
base=put(bpy.context.object,'COL_Artwork');base.name='MESH_Medallion_Base';base.data.materials.append(edge)
bevel=base.modifiers.new('Soft machined rim','BEVEL');bevel.width=.05;bevel.segments=3
verts=[(0,0,.1)];faces=[]
rings,segments=72,192
def height(x,y):
    h=1.5*math.exp(-((x+.9)**2/.6+(y-.5)**2/.9))+1.9*math.exp(-(x*x/.5+(y-.75)**2/.45))+1.2*math.exp(-((x-1.2)**2/.65+(y-.15)**2/.6))
    h+=.16*(math.sin(x*4+y*1.3)+math.cos(y*5-x))*max(0,1-(x*x+y*y)/9)
    return .05+max(0,h)*max(0,1-(x*x+y*y)/9)**.45
verts[0]=(0,0,height(0,0))
for r in range(1,rings+1):
    rad=3*r/rings
    for a in range(segments):
        theta=2*math.pi*a/segments
        x,y=rad*math.cos(theta),rad*math.sin(theta)
        verts.append((x,y,height(x,y)))
for a in range(segments):faces.append((0,1+a,1+(a+1)%segments))
for r in range(rings-1):
    for a in range(segments):
        q=1+r*segments+a;n=1+r*segments+(a+1)%segments
        faces.append((q,q+segments,n+segments,n))
terrain=mesh('MESH_Abstract_Kumaon_Relief',verts,faces,gold)
for r in [i*.12 for i in range(2,25)]:
    curve=bpy.data.curves.new('Contour','CURVE');curve.dimensions='3D';curve.bevel_depth=.007;curve.bevel_resolution=1
    spline=curve.splines.new('POLY');spline.points.add(191)
    for a,p in enumerate(spline.points):
        theta=2*math.pi*a/192
        x=r*math.cos(theta);y=r*math.sin(theta)
        p.co=(x,y,height(x,y)+.012,1)
    spline.use_cyclic_u=True
    obj=bpy.data.objects.new('CURVE_Contour_'+str(round(r,2)),curve);bpy.data.collections['COL_Artwork'].objects.link(obj);obj.data.materials.append(edge)
camera((5.6,-7.3,7.8),(0,0,.35),8.7)
lights()
save_and_render('mountain-relief')
