import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <section>
      <div id="home">
        <div id="home-content-div">
          <h1>Status Quo</h1>
          <h3>Stand out. Be unique.</h3>
          <button onClick={() => navigate("/products")}> Shop now</button>
        </div>
      </div>
      <div id="home-under-landing">
        <div id="home-ul-img-cont"></div>
        <div id="home-ul-content-cont">
          <h2>Company Testimony</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
            quos culpa voluptates consequatur voluptatem esse ab veniam
            accusamus nobis atque rerum iure hic, itaque quas, repudiandae
            necessitatibus dolores asperiores rem?
          </p>
        </div>
      </div>
    </section>
  );
}
