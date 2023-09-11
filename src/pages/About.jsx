import React from "react";
import { useAuth } from "../context/auth";
import { Link } from "react-router-dom";
import intro from "../img/about_intro.jpg";
import "../styles/AboutStyles.css";

const About = () => {
  const [auth, setAuth] = useAuth();
  return (
    <div className="wrapper">
      <div className="aboutCtn">
        <div className="aboutTitle">ABOUT US</div>
        <div className="missionTitle">OUR MISSION</div>
        <div className="advantagesTitle">ADVANTAGES</div>
        <div className="buttonCtn">
          <div className="aboutButton">
            {auth?.user ? (
              <Link to="/home">
                <button>Повернутись</button>
              </Link>
            ) : (
              <Link to="/">
                <button>Повернутись</button>
              </Link>
            )}
          </div>
        </div>
        <div className="blockBody">
          <div className="image">
            <img src={intro} alt="about" />
          </div>
          <div className="textBlock">
            Ласкаво просимо на наш веб-сайт, який надає можливість зручного
            бронювання ліків. Ми прагнемо забезпечити легкий та доступний спосіб
            отримання лікарських препаратів, допомагаючи нашим клієнтам швидко
            та безпечно замовити потрібні препарати з будь-якого місця.
          </div>
        </div>
        "{" "}
        <div className="blockBody">
          <div className="textBlock">
            Наша команда працює над тим, щоб спростити процес отримання ліків і
            забезпечити широкий вибір якісних продуктів для наших клієнтів. Ми
            віримо, що доступ до ліків є необхідним правом кожної людини і ми
            докладаємо зусиль, щоб зробити його більш зручним і ефективним.
          </div>
          "{" "}
          <div className="image">
            <img src={intro} alt="about" />
          </div>
        </div>
        "{" "}
        <div className="blockBody">
          <div className="image">
            {" "}
            <img src={intro} alt="about" />
          </div>
          "{" "}
          <div className="textBlock">
            Веб-сайт пропонує простий та інтуїтивно зрозумілий інтерфейс, який
            дозволяє швидко знайти потрібні ліки та забронювати їх у зручний для
            вас час. Співпраця з надійними постачальниками лікарських засобів,
            що дозволяє нам пропонувати широкий вибір препаратів різних
            категорій і дозувань. Безпека ваших особистих даних перш за все та
            гарантія конфіденційністі замовлень.
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
