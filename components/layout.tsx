import LogoSVG from '../public/logo.svg'
import NewsletterForm from '../components/newsletter_form'

export default function Layout({ children }) {
  return (
    <>
      <header className="bg-gray-100 p-2 px-3">
        <LogoSVG
          alt="logo"
          fill={"#1E40AF"}
          height="50"
          viewBox="0 -10 600 3000"
          preserveAspectRatio="xMinYMin slice" />
      </header>

      <div className="container mx-auto p-3 max-w-xl">
        {children}
      </div>

      <footer className="">
        <div className="p-2 px-3">
          <p>
            Inscreva-se para receber updates.
          </p>
        </div>

        <NewsletterForm className="" />

        <div className="p-2 px-3 bg-gray-100">
          checklistdodev.com
        </div>
      </footer>
    </>
  )
}
