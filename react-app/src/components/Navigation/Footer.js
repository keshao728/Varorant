
const Footer = () => {
  return (
    <div className="footer">
    <div className="proj-directory-wrapper">
      <a className="proj-directory" href="https://github.com/keshao728/Varorant" target="_blank" rel="noreferrer">
        VIEW PROJECT GITHUB
      </a>
    </div>
    <div className="dev-socials">
      <div className="dev-socials-links">
        <a href="https://github.com/keshao728" className="dev-link" target="_blank" rel="noreferrer">
          <i className="fa-brands fa-github"></i></a>
      </div>

      <div className="dev-socials-links">
        <a href="https://www.linkedin.com/in/keyingshao/" className="dev-link" target="_blank" rel="noreferrer">
          <i className="fa-brands fa-linkedin"></i>
        </a>
      </div>
    </div>
    <div className="trademark">
      ©2022 MEOWIT GAMES, INC. VARORANT, AND ANY ASSOCIATED LOGOS ARE TRADEMARKS, SERVICE MARKS, AND/OR REGISTERED TRADEMARKS OF MEOWIT GAMES, INC.
    </div>
  </div>
  )
}

export default Footer;
