import Logo from "../ui/Logo";

export default function Footer() {
  const linksClasses = "text-primary dark:text-primary-100 underline";

  return (
    <footer className="p-3">
      <div className="p-10 bg-white-50 dark:bg-dark-50 rounded-md">
        <Logo />
        <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-10">
          <p>
            Pixelstock is a stock app developed by{" "}
            <a
              href="https://github.com/MostafaOS21"
              target="_blank"
              className={linksClasses}
            >
              Mostafa Osama
            </a>{" "}
            and all the media is provided by{" "}
            <a
              href="https://www.pexels.com/"
              target="_blank"
              className={linksClasses}
            >
              Pexels
            </a>
            .
          </p>
          <p>
            Follow me on:
            <br />
            <a
              href="https://github.com/MostafaOS21"
              target="_blank"
              className={linksClasses}
            >
              Github
            </a>{" "}
            <a
              href="https://www.linkedin.com/in/mostafa-osama-a5b042239/"
              target="_blank"
              className={linksClasses}
            >
              Linkedin
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
