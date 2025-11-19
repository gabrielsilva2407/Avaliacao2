import { Link } from "react-router";
import style from "./home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
  const [info, setInfo] = useState([]);

  async function Get() {
    try {
      const response = await axios.get(
        "https://proweb.leoproti.com.br/alunos",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      setInfo(response.data);
    } catch (error) {}
  }

  useEffect(() => {
    Get();
  }, []);
  return (
    <div>
      <section className={style.conteiner}>
        {info.map((item) => (
          <div key={item.id} className={style.item}>
            <span className={style.link}>{item.nome}</span>
            <Link className={style.link} to={`/descricao/${item.id}`}>
              Descrição
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Home;