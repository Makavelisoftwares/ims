import { ClientDahboard } from "@/app/(intern)/_components/client-dashboard";
import { HeaderIntern } from "@/app/(intern)/_components/header";
import { SpvSchool } from "@/app/(intern)/_components/spv-school";


async function SchoolSpvPage({ params }) {
  const id = params.id;

  return (
    <div>
      <div>
        <HeaderIntern id={id} />
      </div>

      <div>
        <SpvSchool id={id}/>
      </div>

      <div>
        <ClientDahboard id={id} />
      </div>
    </div>
  );
}

export default SchoolSpvPage;
