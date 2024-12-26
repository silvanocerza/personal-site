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

  return (
    <header className="border-b-2 border-green-500 pb-4">
      <div className="flex items-center gap-4">
        <Image
          src="/me.jpg"
          alt="Silvano Cerza picture"
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">Hey, I'm Silvano!</h1>
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
    </header>
  );
}
