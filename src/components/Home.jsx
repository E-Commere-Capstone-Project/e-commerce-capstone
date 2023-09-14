import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <section>
      <div id="home">
        <h1>Status Quo</h1>
        <h3>
          Shop to your heart&apos;s content and make yourself stand out. Be
          unique.
        </h3>
        <button onClick={() => navigate("/products")}> Shop now</button>
      </div>
      <div id="home-under-landing">
        <div id="home-ul-img-cont">
          {/* <img src="https://images.unsplash.com/photo-1592914637125-28479601c75a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" /> */}
        </div>
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
