import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreativeCommons,
  faCreativeCommonsBy,
  faCreativeCommonsNc,
  faCreativeCommonsSa,
} from "@fortawesome/free-brands-svg-icons";

export default function Header() {
  return (
    <footer className="mt-8 pt-2 border-t-2 dark:border-gray-800">
      The content of this website is licensed under{" "}
      <a
        className="underline"
        href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
      >
        CC BY-NC-SA 4.0{" "}
        <FontAwesomeIcon icon={faCreativeCommons} className="fa-fw" />
        <FontAwesomeIcon icon={faCreativeCommonsBy} className="fa-fw" />
        <FontAwesomeIcon icon={faCreativeCommonsNc} className="fa-fw" />
        <FontAwesomeIcon icon={faCreativeCommonsSa} className="fa-fw" />
      </a>
    </footer>
  );
}
