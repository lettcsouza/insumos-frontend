import { useEffect, useState } from "react";
import axios from "axios";
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableCell,
} from "@/components/ui/table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArrowLeftIcon, TrashIcon } from "@radix-ui/react-icons"; // Importando o ícone do TrashIcon
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Insumo = {
	ID_INSUMO: number;
	Nome: string;
	Descricao: string;
	Custo_Unitario: number;
	Data_de_validade: string; // Usamos string para datas no formato ISO
	Quantidade_em_estoque: number;
	Numero_Lote: string; // Caso o lote não seja um número, use string
	Fabricante: string;
	Data_Fabricacao: string; // Usamos string para datas no formato ISO
};

const InsumosPage = () => {
	const [insumos, setInsumos] = useState<Insumo[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get("http://localhost:3000/insumos")
			.then((response) => {
				setInsumos(response.data);
				setLoading(false);
				toast.success("Insumos carregados com sucesso", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
			})
			.catch((error) => {
				console.error("Erro ao carregar insumos:", error);
				toast.error("Erro ao carregar insumos", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
				setLoading(false);
			});
	}, []);

	const handleDelete = (id: number) => {
		axios
			.delete(`http://localhost:3000/insumos/${id}`)
			.then(() => {
				setInsumos((prevInsumos) =>
					prevInsumos.filter((insumo) => insumo.ID_INSUMO !== id)
				);
				toast.success("Insumo deletado com sucesso", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
			})
			.catch((error) => {
				console.error("Erro ao deletar insumo:", error);
				toast.error("Erro ao deletar insumo", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
			});
	};

	if (loading) {
		return <div>Carregando...</div>;
	}

	return (
		<div className="w-screen max-w-7xl mx-auto px-4">
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			<Link to={"/"}>
				<ArrowLeftIcon className="text-primary h-10 w-10" />
			</Link>
			<h1 className="text-4xl text-foreground font-semibold text-center text-[#333333] p-4 pb-8">
				Lista de Insumos
			</h1>
			<div className="border-2 max-h-[482px] overflow-scroll">
				<Table>
					<TableHeader className="bg-primary text-white font-semibold">
						<TableRow>
							<TableCell>Nome</TableCell>
							<TableCell>Descrição</TableCell>
							<TableCell>Custo Unitário</TableCell>
							<TableCell>Data de Validade</TableCell>
							<TableCell>Quantidade em Estoque</TableCell>
							<TableCell>Número do Lote</TableCell>
							<TableCell>Fabricante</TableCell>
							<TableCell>Data de Fabricação</TableCell>
							<TableCell>Ações</TableCell> {/* Nova coluna para ações */}
						</TableRow>
					</TableHeader>
					<TableBody>
						{insumos.map((insumo, index) => (
							<TableRow
								key={insumo.ID_INSUMO}
								className={index % 2 === 0 ? "bg-gray-400 h-20" : "h-20"}
							>
								<TableCell>{insumo.Nome}</TableCell>
								<TableCell>{insumo.Descricao}</TableCell>
								<TableCell>{insumo.Custo_Unitario}</TableCell>
								<TableCell>
									{new Date(insumo.Data_de_validade).toLocaleDateString()}
								</TableCell>
								<TableCell>{insumo.Quantidade_em_estoque}</TableCell>
								<TableCell>{insumo.Numero_Lote}</TableCell>
								<TableCell>{insumo.Fabricante}</TableCell>
								<TableCell>
									{new Date(insumo.Data_Fabricacao).toLocaleDateString()}
								</TableCell>
								<TableCell>
									<Button
										variant={"destructive"}
										className="p-2"
										onClick={() => handleDelete(insumo.ID_INSUMO)}
									>
										<TrashIcon className="text-white w-6 h-6" />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default InsumosPage;
