import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GoogleMap from "google-map-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import OrdersStatus from "../OrdersStatus";

function Marker(props) {
  return (
    <Tooltip title={props.text} placement="top">
      <Icon className="text-red">place</Icon>
    </Tooltip>
  );
}

function OrderDetailsTab() {
  const order = useSelector(({ eCommerceApp }) => eCommerceApp.order);
  const [map, setMap] = useState("shipping");

  return (
    <div>
      <div className="pb-48">
        <div className="pb-16 flex items-center">
          <Icon color="action">account_circle</Icon>
          <Typography className="h2 mx-12 font-medium" color="textSecondary">
            User
          </Typography>
        </div>

        <div className="mb-24">
          <div className="table-responsive mb-48">
            <table className="simple">
              <thead>
                <tr>
                  <th>
                    <Typography className="font-semibold">Name</Typography>
                  </th>
                  <th>
                    <Typography className="font-semibold">Email</Typography>
                  </th>
                  <th>
                    <Typography className="font-semibold">Phone</Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="flex items-center">
                      {/* <Avatar src={order.user.avatar} /> */}
                      <Typography className="truncate mx-8">
                        {/* {`${order.customer.firstName} ${order.customer.lastName}`} */}
                      </Typography>
                    </div>
                  </td>
                  <td>
                    <Typography className="truncate">
                      {/* {order.customer.email} */}
                    </Typography>
                  </td>
                  <td>
                    <Typography className="truncate">
                      {/* {order.customer.phone} */}
                    </Typography>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="pb-48">
        <div className="pb-16 flex items-center">
          <Icon color="action">attach_money</Icon>
          <Typography className="h2 mx-12 font-medium" color="textSecondary">
            Salary
          </Typography>
        </div>

        <div className="table-responsive">
          <table className="simple">
            <thead>
              <tr>
                <th>
                  <Typography className="font-semibold">Amount</Typography>
                </th>

                <th>
                  <Typography className="font-semibold">
                    Work Start Date
                  </Typography>
                </th>

                <th>
                  <Typography className="font-semibold">
                    Work End Date
                  </Typography>
                </th>
                <th>
                  <Typography className="font-semibold">Bonus</Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span>£</span>
                  <span className="truncate">{order.salary.amount}</span>
                </td>
                <td>
                  <span className="truncate">{order.salary.workStartDate}</span>
                </td>
                <td>
                  <span className="truncate">{order.salary.workEndDate}</span>
                </td>
                <td>
                  <span>£</span>
                  <span className="truncate">{order.salary.bonus}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="pb-48">
        <div className="pb-16 flex items-center">
          <Icon color="action">moneyOff</Icon>
          <Typography className="h2 mx-12 font-medium" color="textSecondary">
            Deductions
          </Typography>
        </div>

        <div className="table-responsive">
          <table className="simple">
            <thead>
              <tr>
                <th>
                  <Typography className="font-semibold">Amount</Typography>
                </th>
                <th>
                  <Typography className="font-semibold">Type</Typography>
                </th>
                <th>
                  <Typography className="font-semibold">Reason</Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {order.deductions.map((deduction) => (
                <tr key={deduction.id}>
                  <td>
                    <span>£</span>
                    <span className="truncate">{deduction.amount}</span>
                  </td>
                  <td>
                    <span className="truncate">{deduction.type}</span>
                  </td>
                  <td>
                    <span className="truncate">{deduction.reason}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsTab;
