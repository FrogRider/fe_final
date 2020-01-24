import React from 'react';
import './info.scss';



const Info = (props) => {
  return (
    <div className="info block">
      <div className="aboutUs">
        <p> About us </p>
        <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam rem
        praesentium sunt, quas, ducimus debitis corporis sequi iure ut non autem
        officiis! Minus et corporis perferendis consequatur repudiandae. Odio
        maiores deleniti porro culpa harum, perferendis quidem atque et, rem qui
        nulla magnam, necessitatibus fuga quos. Et ut magni vel recusandae earum
        ex sit accusantium laudantium, unde quia hic amet reiciendis ipsum
        doloremque placeat, porro praesentium fuga! Asperiores aspernatur
        officiis qui quibusdam ipsum doloribus rem molestias. Facere quia
        eligendi incidunt aliquam inventore quo dolore, odit reprehenderit
        labore consequuntur quod repellendus? Odit est aut illo ab eum quas
        distinctio voluptatibus unde dignissimos minima, assumenda debitis! Esse
        repellendus facilis deleniti commodi voluptatum odit accusantium
        asperiores quibusdam, odio nesciunt tenetur nobis excepturi autem
        aspernatur.
        </p>
      </div>

      <div className="statistics">

        <div className="card">
          <div className="number">1700</div>
          <div className="label">company employees</div>
        </div>
        <div className="card">
          <div className="number">13</div>
          <div className="label">years we are with you</div>
        </div>
        <div className="card">
          <div className="number">47</div>
          <div className="label">dishes in menu</div>
        </div>
        <div className="card">
          <div className="number">12</div>
          <div className="label">cities of Ukraine</div>
        </div>

      </div>
    </div>
  );
};

export default Info;