import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faBluesky,
  faMastodon,
} from "@fortawesome/free-brands-svg-icons";
import { faRss } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { DarkModeToggle } from "@/app/components/dark-mode-toggle";
import Link from "next/link";

export default function Header() {
  const socials = [
    {
      icon: faGithub,
      link: "https://github.com/silvanocerza",
    },
    {
      icon: faLinkedin,
      link: "https://www.linkedin.com/in/silvanocerza",
    },
    {
      icon: faBluesky,
      link: "https://bsky.app/profile/silvanocerza.bsky.social",
    },
    {
      icon: faMastodon,
      link: "https://mastodon.world/@silvanocerza",
    },
    {
      icon: faRss,
      link: "/rss.xml",
    },
  ];

  const links = [
    {
      name: "Blog",
      href: "/blog",
    },
    {
      name: "Talks",
      href: "/talks",
    },
    {
      name: "Resume",
      href: "https://resume.silvanocerza.com",
    },
    {
      name: "About",
      href: "/about",
    },
  ];

  return (
    <header className="flex flex-col">
      <div className="flex items-center gap-4 border-b-2 border-green-500 dark:border-green-400 pb-4">
        <Link
          href="/"
          className="relative after:absolute after:inset-0 hover:after:bg-green-600 after:mix-blend-overlay after:rounded-full "
        >
          <Image
            src="/me.jpg"
            alt="Silvano Cerza picture"
            width={100}
            height={100}
            className="rounded-full"
          />
        </Link>

        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="hover:text-green-500 hover:underline hover:decoration-2"
          >
            <h1 className="text-4xl font-bold">Hey, I'm Silvano!</h1>
          </Link>
          <p>Writing code and other stuff.</p>
        </div>

        <div className="grid grid-rows-2 grid-flow-col ml-auto gap-4 p-4">
          {socials.map(({ icon, link }) => (
            <a
              key={link}
              href={link}
              target="_blank"
              rel="noreferrer"
              className="hover:text-red-500"
            >
              <FontAwesomeIcon icon={icon} className="fa-fw" />
            </a>
          ))}
          <p className="hover:text-red-500">
            <DarkModeToggle />
          </p>
        </div>
      </div>
      <div className="flex flex-row pt-2 justify-between">
        {links.map(({ name, href }) => (
          <Link
            key={href}
            href={href}
            className="font-semibold
            text-xl
            text-green-600
            dark:text-green-400
            hover:underline
            hover:text-green-400
            hover:decoration-green-500
            hover:dark:text-green-200
            hover:dark:decoration-green-200
            underline-offset-8"
          >
            {name}
          </Link>
        ))}
      </div>
    </header>
  );
}
