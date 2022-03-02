import AcademyAppConfig from "./academy/AcademyAppConfig";
import CalendarAppConfig from "./calendar/CalendarAppConfig";
import ChatAppConfig from "./chat/ChatAppConfig";
import ContactsAppConfig from "./contacts/ContactsAppConfig";
import AnalyticsDashboardAppConfig from "./dashboards/analytics/AnalyticsDashboardAppConfig";
import ProjectDashboardAppConfig from "./dashboards/project/ProjectDashboardAppConfig";
import ReceiptsAppConfig from "./receipts/ReceiptsAppConfig";
import FileManagerAppConfig from "./file-manager/FileManagerAppConfig";
import MailAppConfig from "./mail/MailAppConfig";
import NotesAppConfig from "./notes/NotesAppConfig";
import ScrumboardAppConfig from "./scrumboard/ScrumboardAppConfig";
import TodoAppConfig from "./todo/TodoAppConfig";
import UsersAppConfig from "./users/UsersAppConfig";

const appsConfigs = [
  AnalyticsDashboardAppConfig,
  ProjectDashboardAppConfig,
  MailAppConfig,
  TodoAppConfig,
  FileManagerAppConfig,
  ContactsAppConfig,
  UsersAppConfig,
  CalendarAppConfig,
  ChatAppConfig,
  ReceiptsAppConfig,
  ScrumboardAppConfig,
  AcademyAppConfig,
  NotesAppConfig,
];

export default appsConfigs;
