import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input"; // Importando o componente Input
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

const validationSchema = Yup.object().shape({
	nome: Yup.string().required("Nome é obrigatório"),
	fabricante: Yup.string().required("Fabricante é obrigatório"),
	custoUnitario: Yup.number()
		.required("Custo unitário é obrigatório")
		.positive("Deve ser um número positivo"),
	descricao: Yup.string().required("Descrição é obrigatória"),
	lote: Yup.string().required("Lote é obrigatório"),
	quantidadeEmEstoque: Yup.number()
		.required("Quantidade em estoque é obrigatória")
		.integer("Deve ser um número inteiro")
		.positive("Deve ser um número positivo"),
	dataDeValidade: Yup.date()
		.required("Data de validade é obrigatória")
		.typeError("Data inválida"),
	dataDeFabricacao: Yup.date()
		.required("Data de fabricação é obrigatória")
		.typeError("Data inválida"),
});

const ProductForm = () => {
	const initialValues = {
		nome: "",
		fabricante: "",
		custoUnitario: "",
		descricao: "",
		lote: "",
		quantidadeEmEstoque: "",
		dataDeValidade: "",
		dataDeFabricacao: "",
	};

	const handleSubmit = async (values:any, { resetForm }:any) => {
		const payload = {
			Nome: values.nome,
			Descricao: values.descricao,
			Custo_Unitario: parseFloat(values.custoUnitario),
			Data_de_validade: new Date(values.dataDeValidade).toISOString(),
			Quantidade_em_estoque: parseInt(values.quantidadeEmEstoque),
			Numero_Lote: values.lote,
			Fabricante: values.fabricante,
			Data_Fabricacao: new Date(values.dataDeFabricacao).toISOString(),
		};

		await axios
			.post("https://insumos-api-production.up.railway.app/insumos", payload)
			.then(() => {
				toast.success("Insumo criado com sucesso", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
				resetForm();
			})
			.catch((err) => {
				console.error(err);
				toast.error("Erro ao criar insumo", {
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

	return (
		<div className="w-full max-w-4xl mx-auto">
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
			{/* Same as */}
			<ToastContainer />
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting }) => (
					<Form>
                        <div className="w-full">
                            <Link to={'/'}>
                            <ArrowLeftIcon className="text-primary h-10 w-10" />
                            </Link>
                            
                        </div>
						<h1 className="text-4xl text-foreground font-semibold text-center text-[#333333] p-4 pb-8">
							Cadastro de insumo{" "}
						</h1>

						<div className="flex px-10 md:gap-10 md:flex-row flex-col gap-0">
							<div className="w-full">
								<div>
									<label htmlFor="nome">Nome</label>
									<Field name="nome" as={Input} />
									<ErrorMessage
										name="nome"
										component="div"
										className="text-red-600"
									/>
								</div>
								<div>
									<label htmlFor="fabricante">Fabricante</label>
									<Field name="fabricante" as={Input} />
									<ErrorMessage
										name="fabricante"
										component="div"
										className="text-red-600"
									/>
								</div>
								<div>
									<label htmlFor="custoUnitario">Custo Unitário</label>
									<Field name="custoUnitario" as={Input} type="number" />
									<ErrorMessage
										name="custoUnitario"
										component="div"
										className="text-red-600"
									/>
								</div>
								<div className="flex flex-col gap-0 md:gap-5 md:flex-row">
									<div className="w-full">
										<label htmlFor="dataDeValidade">Data de Validade</label>
										<Field name="dataDeValidade" as={Input} type="date" />
										<ErrorMessage
											name="dataDeValidade"
											component="div"
											className="text-red-600"
										/>
									</div>
									<div className="w-full">
										<label htmlFor="dataDeFabricacao">Data de Fabricação</label>
										<Field name="dataDeFabricacao" as={Input} type="date" />
										<ErrorMessage
											name="dataDeFabricacao"
											component="div"
											className="text-red-600"
										/>
									</div>
								</div>
							</div>
							<div className="w-full">
								<div>
									<label htmlFor="descricao">Descrição</label>
									<Field name="descricao" as={Input} />
									<ErrorMessage
										name="descricao"
										component="div"
										className="text-red-600"
									/>
								</div>
								<div>
									<label htmlFor="lote">Lote</label>
									<Field name="lote" as={Input} type="number" />
									<ErrorMessage
										name="lote"
										component="div"
										className="text-red-600"
									/>
								</div>
								<div>
									<label htmlFor="quantidadeEmEstoque">
										Quantidade em Estoque
									</label>
									<Field name="quantidadeEmEstoque" as={Input} type="number" />
									<ErrorMessage
										name="quantidadeEmEstoque"
										component="div"
										className="text-red-600"
									/>
								</div>
								<div className="w-full flex justify-center md:justify-end mt-7">
									<Button type="submit" disabled={isSubmitting}>
										Cadastrar insumo
									</Button>
								</div>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default ProductForm;
