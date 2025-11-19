import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import style from "./descricao.module.css";

function Descricao() {
  const { id } = useParams();
  const [info, setInfo] = useState({});

  async function ById() {
    try {
      const response = await axios.get(
        `https://proweb.leoproti.com.br/alunos/${id}`
      );

      setInfo(response.data);
    } catch (error) {
      console.log("ERRO");
    }
  }

  useEffect(() => {
    ById();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.card}>
        <h1 className={style.title}>Informações do Aluno</h1>

        <table className={style.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Turma</th>
              <th>Curso</th>
              <th>Matrícula</th>
            </tr>
          </thead>

          <tbody>
            <tr className={style.rowValue}>
              <td>{info.nome}</td>
              <td>{info.turma}</td>
              <td>{info.curso}</td>
              <td>{info.matricula}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Descricao;