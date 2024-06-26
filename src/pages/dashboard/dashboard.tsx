import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TEChart } from "tw-elements-react";

const Dashboard = () => {
  const [expiredLength, setExpiredLength] = useState(0);
  const [moreThan30DaysLength, setMoreThan30DaysLength] = useState(0);
  const [lessThan30DaysLength, setLessThan30DaysLength] = useState(0);
  const [totalInputsLength, setTotalInputsLength] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // Função para buscar os dados dos endpoints
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch(
            "https://insumos-api-production.up.railway.app/dashboard/insumos-vencidos"
          ),
          fetch(
            "https://insumos-api-production.up.railway.app/dashboard/insumos-maior-30dias"
          ),
          fetch(
            "https://insumos-api-production.up.railway.app/dashboard/insumos-menor-30dias"
          ),
          fetch(
            "https://insumos-api-production.up.railway.app/dashboard/insumos-estoque"
          ),
        ]);

        const jsonResponses = await Promise.all(
          responses.map((response) => response.json())
        );

        // Extrair o comprimento de cada resposta
        const expiredLength = jsonResponses[0].insumosVencidos.length;
        const moreThan30DaysLength = jsonResponses[1].insumosMaior30Dias.length;
        const lessThan30DaysLength = jsonResponses[2].insumosMenor30Dias.length;
        const totalInputs = jsonResponses[3].totalInsumos;

        setExpiredLength(expiredLength);
        setMoreThan30DaysLength(moreThan30DaysLength);
        setLessThan30DaysLength(lessThan30DaysLength);
        setTotalInputsLength(totalInputs);
        setDataLoaded(true);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    // Chamar a função de busca dos dados
    fetchData();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto flex justify-center">
      <div className="w-full max-w-4xl">
        {dataLoaded ? (
          <>
            <Link to={"/"}>
              <ArrowLeftIcon className="text-primary h-10 w-10" />
            </Link>
            <div className="w-80 sm:w-96 flex flex-col justify-center items-center mx-auto">
              <div className="w-48 mb-4 sm:mb-10">
                <p className="text-center">Estoque total</p>
                <div className="bg-[#595858] p-5 py-4 rounded-2xl shadow-xl font-bold text-white text-xl cursor-default flex justify-center">
                  {totalInputsLength}
                </div>
              </div>
              <TEChart
                type="doughnut"
                data={{
                  labels: [
                    "Vencimento em mais de 30 dias",
                    "Vencimento em menos de 30 dias",
                    "Expirado",
                  ],
                  datasets: [
                    {
                      label: "Insumos",
                      data: [
                        moreThan30DaysLength,
                        lessThan30DaysLength,
                        expiredLength,
                      ],
                      backgroundColor: [
                        "rgba(199, 206, 255, 1)",
                        "rgba(208, 197, 93, 1)",
                        "rgba(64, 0, 150, 1)",
                      ],
                    },
                  ],
                }}
              />
            </div>

            <div className="w-full flex flex-wrap justify-center gap-4 mt-12">
              <div className="w-full sm:w-48 mb-4 sm:mb-0">
                <p className="text-center">Validade acima de 30 dias</p>
                <div className="bg-[#c7ceff] p-5 py-4 rounded-2xl shadow-xl font-bold text-[#464545] text-xl cursor-default flex justify-center">
                  {moreThan30DaysLength}
                </div>
              </div>
              <div className="w-full sm:w-48 mb-4 sm:mb-0">
                <p className="text-center">Validade abaixo de 30 dias</p>
                <div className="bg-[#d0c55d] p-5 py-4 rounded-2xl shadow-xl font-bold text-[#464545] text-xl cursor-default flex justify-center">
                  {lessThan30DaysLength}
                </div>
              </div>
              <div className="w-full sm:w-48">
                <p className="text-center">Validade expirada</p>
                <div className="bg-[#400096] p-5 py-4 rounded-2xl shadow-xl font-bold text-white text-xl cursor-default flex justify-center">
                  {expiredLength}
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center">Carregando dados...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
