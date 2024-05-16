import useBoss from "../../../hooks/useBoss";
import useCEO from "../../../hooks/useCEO";
import useCoOrdinetor from "../../../hooks/useCoOrdinetor";
import useEmploye from "../../../hooks/useEmploye";
import useMockup from "../../../hooks/useMockup";
import CoHome from "../CoOrdinetorDashbaord/CoHome/CoHome";
import BossDashboardHome from "../bossDashboard/BossDashbaordHome/BossDashboardHome";
import EmployeHome from "../employDashboard/employHome/EmployeHome";
import MockupHome from "../mockupDashboard/mockupHome/MockupHome";
import SEOHome from "../seoDashboard/seoHome/SEOHome";

const DashboardMainHome = () => {
  const [co] = useCoOrdinetor();
  const [boss] = useBoss();
  const [mockup] = useMockup();
  const [seo] = useCEO();
  const [employe] = useEmploye();
  return (
    <div>
      {/* use dashbaord home with user role conditional */}
      {(boss && <BossDashboardHome />) ||
        (co && <CoHome />) ||
        (mockup && <MockupHome />) ||
        (seo && <SEOHome />) ||
        (employe && <EmployeHome />)}
    </div>
  );
};

export default DashboardMainHome;
