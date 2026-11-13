import { Route, Routes } from "react-router";
import {
  AboutPage,
  ActivitiesPage,
  ArticlePage,
  ContactPage,
  GalleryPage,
  NewsPage,
  NotFoundPage,
  ServicesPage,
  SuitePage,
  SuitesPage,
} from "../tidescape/Pages";

export default function LegacyPages() {
  return (
    <Routes>
      <Route path="/about" element={<AboutPage />} />
      <Route path="/suites" element={<SuitesPage />} />
      <Route path="/suites/:slug" element={<SuitePage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/activities" element={<ActivitiesPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/news/:slug" element={<ArticlePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
