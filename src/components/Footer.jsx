import { IoLogoGithub } from "react-icons/io";

export default function Footer() {
  function openLinkNewTab(url) {
    window.open(url, "_blank", "noreferrer");
  }
  return (
    <footer>
      <h3>Status Quo</h3>
      <h5>
        &copy; 2023 Fullstack Academy x Amazon Career Choice Capstone, All
        rights reserved
      </h5>
      <h5>Not for Commercial Use</h5>
      <IoLogoGithub
        className="icon"
        onClick={() =>
          openLinkNewTab("https://github.com/E-Commere-Capstone-Project")
        }
      />
    </footer>
  );
}
