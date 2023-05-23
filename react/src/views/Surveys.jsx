import PageComponent from "../components/PageComponent";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Surveys() {

    const { surveys } = useStateContext();

    return (
        <PageComponent title="Surveys">

        </PageComponent>
    )
}
