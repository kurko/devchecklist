export default function NewsletterForm({ className }) {
  const substackIframe = `<iframe src="https://checklistdodev.substack.com/embed" class="w-full max-w-screen-sm" style="background: transparent;" frameborder="0" scrolling="no"></iframe>`

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: substackIframe }}>
    </span>
  )
}
