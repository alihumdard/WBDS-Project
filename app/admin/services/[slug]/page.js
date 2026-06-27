import ServicePageForm from "@/components/admin/ServicePageForm";

export default async function EditServicePage({ params }) {
  const { slug } = await params;
  return <ServicePageForm mode="edit" slug={slug} />;
}
