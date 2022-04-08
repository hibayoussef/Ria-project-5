import AcademyAppConfig from "./academy/AcademyAppConfig";
import CalendarAppConfig from "./calendar/CalendarAppConfig";
import ChatAppConfig from "./chat/ChatAppConfig";
import ContactsAppConfig from "./contacts/ContactsAppConfig";
import AnalyticsDashboardAppConfig from "./dashboards/analytics/AnalyticsDashboardAppConfig";
import ProjectDashboardAppConfig from "./dashboards/project/ProjectDashboardAppConfig";
import ReceiptsAppConfig from "./receipts/ReceiptsAppConfig";
import ReceiptsUserAppConfig from "./receipts-user/ReceiptsUserAppConfig";
import FileManagerAppConfig from "./file-manager/FileManagerAppConfig";
import MailAppConfig from "./mail/MailAppConfig";
import NotesAppConfig from "./notes/NotesAppConfig";
import ScrumboardAppConfig from "./scrumboard/ScrumboardAppConfig";
import TodoAppConfig from "./todo/TodoAppConfig";
import UsersAppConfig from "./users/UsersAppConfig";
import JobsAppConfig from "./jobs/JobsAppConfig";
import SalaryScalesAppConfig from "./salary-scales/SalaryScalesAppConfig";
// import InvoicesAppConfig from "./invoices/InvoicesAppConfig";

const appsConfigs = [
  AnalyticsDashboardAppConfig,
  ProjectDashboardAppConfig,
  MailAppConfig,
  TodoAppConfig,
  FileManagerAppConfig,
  ContactsAppConfig,
  UsersAppConfig,
  JobsAppConfig,
  CalendarAppConfig,
  ChatAppConfig,
  ReceiptsAppConfig,
  ReceiptsUserAppConfig,
  ScrumboardAppConfig,
  AcademyAppConfig,
  NotesAppConfig,
  JobsAppConfig,
  SalaryScalesAppConfig,
  // InvoicesAppConfig,
];

export default appsConfigs;
