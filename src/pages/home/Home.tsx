import { Button } from "@/components/ui/button";
import { FilePlusIcon, TableIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div className="w-full max-w-7xl mx-auto">
			<h1 className="text-4xl text-foreground font-semibold text-center text-[#333333] p-4 pb-16">O que iremos fazer hoje?</h1>
			<div className="w-full flex items-center justify-between max-w-3xl mx-auto">
                <Link to={'/create-input'}>
                <Button className="h-48 max-w-40 flex flex-col items-center justify-center text-xl text-wrap">
                    <i className="bg-[#EEEBEB] p-3 rounded-full"><FilePlusIcon className="w-9 h-9 text-black"/></i>cadastrar insumos
                </Button>
                </Link>
                <Link to={'/dashboard'}>
                <Button className="h-48 max-w-40 flex flex-col items-center justify-center text-xl text-wrap">
                    <i className="bg-[#EEEBEB] p-3 rounded-full"><TableIcon className="w-9 h-9 text-black"/></i>dashboards
                </Button>
                </Link>
                
                <Link to={'/input-list'}>
                <Button className="h-48 max-w-40 flex flex-col items-center justify-center text-xl text-wrap">
                    <i className="bg-[#EEEBEB] p-3 rounded-full"><TableIcon className="w-9 h-9 text-black"/></i>lista de insumos
                </Button>
                </Link>
            </div>
		</div>
	);
};

export default Home;
