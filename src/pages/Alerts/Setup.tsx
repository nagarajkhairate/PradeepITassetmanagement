import React, { useState } from "react";
import { Typography, Box, Checkbox, Divider, Input, Button } from "@mui/joy";

// Define the props type for AlertOption component
interface AlertOptionProps {
  mainLabel: string;
  subLabel: string;
  emailLabel: string;
  emailDescription: string;
  extraFields?: React.ReactNode;
  checked: boolean;
  emailChecked: boolean;
  onCheckedChange: (checked: boolean) => void;
  onEmailCheckedChange: (checked: boolean) => void;
  onExtraFieldsChange?: (value: any) => void;
  extraFieldsValue?: any;
}

// Reusable AlertOption component
const AlertOption: React.FC<AlertOptionProps> = ({
  mainLabel,
  subLabel,
  emailLabel,
  emailDescription,
  extraFields = null,
  checked,
  emailChecked,
  onCheckedChange,
  onEmailCheckedChange,
  onExtraFieldsChange,
  extraFieldsValue
}) => {
  return (
    <Box sx={{ my: "30px" }}>
      <Checkbox label={mainLabel} checked={checked} onChange={(e) => onCheckedChange(e.target.checked)}/>
      <Box sx={{ ml: "29px", mt: "8px" }}>
        <Typography level="body-sm">
          {subLabel}
        </Typography>
        {extraFields && (
          <Box sx={{ my: "8px" }}>
            {React.cloneElement(extraFields as React.ReactElement, { value: extraFieldsValue, onChange: onExtraFieldsChange })}
          </Box>
        )}
        <Box sx={{ my: "8px" }}>
          <Checkbox label={emailLabel} checked={emailChecked} onChange={(e) => onEmailCheckedChange(e.target.checked)} />
          <Typography level="body-sm">
            {emailDescription}
          </Typography>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
};

const Setup: React.FC = () => {
  const [alerts, setAlerts] = useState({
    assetPastDue: { checked: false, emailChecked: false },
    assetExpiringWarranty: { checked: false, emailChecked: false },
    leaseExpiration: { checked: false, emailChecked: false, leadTime: "" },
    maintenance: { checked: false, emailChecked: false, leadTime: "", overdueTime: "" },
    warrantyExpiration: { checked: false, emailChecked: false, leadTime: "" },
  });

  const handleSave = () => {
    const json = JSON.stringify(alerts, null, 2);
    console.log(json);
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "#f9f9f9", }}>
      <div style={{ marginLeft: "52px",paddingTop:"30px"  }}>
        <Typography level="h3" >
          Setup/Alerts
        </Typography>
      </div>
      <Box
        sx={{
          borderRadius: "16px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          background: "#ffffff",
          padding: "30px",
          margin: {
            xs: "4px",
            md: "52px",
          },
        }}
      >
        <Box>
          <Typography level="body-md" sx={{ fontStyle: "italic" }}>
            We're on guard so you don't have to be. Check boxes next to the
            items you want to be notified about. Decide when you want to be
            alerted, and choose how many days in advance you'll receive the
            alert. Alerts will appear in the left navigation menu and in the
            calendar on the dashboard.
          </Typography>
        </Box>

        <AlertOption
          mainLabel="Asset Past Due Alerts"
          subLabel="Show alerts for assets that are past due."
          emailLabel="Email Assets"
          emailDescription="Turn on this option to email out an alert if any alert exists."
          checked={alerts.assetPastDue.checked}
          emailChecked={alerts.assetPastDue.emailChecked}
          onCheckedChange={(checked) => setAlerts({ ...alerts, assetPastDue: { ...alerts.assetPastDue, checked } })}
          onEmailCheckedChange={(checked) => setAlerts({ ...alerts, assetPastDue: { ...alerts.assetPastDue, emailChecked: checked } })}
        />
        <AlertOption
          mainLabel="Asset Past Due Alerts"
          subLabel="Show alerts for expiring warranty."
          emailLabel="Email Assets"
          emailDescription="Turn on this option to email out an alert if any alert exists."
          checked={alerts.assetExpiringWarranty.checked}
          emailChecked={alerts.assetExpiringWarranty.emailChecked}
          onCheckedChange={(checked) => setAlerts({ ...alerts, assetExpiringWarranty: { ...alerts.assetExpiringWarranty, checked } })}
          onEmailCheckedChange={(checked) => setAlerts({ ...alerts, assetExpiringWarranty: { ...alerts.assetExpiringWarranty, emailChecked: checked } })}
        />
        <AlertOption
          mainLabel="Lease Expiration Alerts"
          subLabel="Show alerts for expiring warranty."
          emailLabel="Email Assets"
          emailDescription="Turn on this option to email out an alert if any alert exists."
          checked={alerts.leaseExpiration.checked}
          emailChecked={alerts.leaseExpiration.emailChecked}
          onCheckedChange={(checked) => setAlerts({ ...alerts, leaseExpiration: { ...alerts.leaseExpiration, checked } })}
          onEmailCheckedChange={(checked) => setAlerts({ ...alerts, leaseExpiration: { ...alerts.leaseExpiration, emailChecked: checked } })}
          extraFields={
            <>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Typography>Lead Time:</Typography>
                <Input sx={{ width: "40px" }} value={alerts.leaseExpiration.leadTime} onChange={(e) => setAlerts({ ...alerts, leaseExpiration: { ...alerts.leaseExpiration, leadTime: e.target.value } })} />
                <Typography>Days</Typography>
              </Box>
            </>
          }
        />
        <AlertOption
          mainLabel="Maintenance Alerts"
          subLabel="Show alerts for expiring warranty."
          emailLabel="Email Assets"
          emailDescription="Turn on this option to email out an alert if any alert exists."
          checked={alerts.maintenance.checked}
          emailChecked={alerts.maintenance.emailChecked}
          onCheckedChange={(checked) => setAlerts({ ...alerts, maintenance: { ...alerts.maintenance, checked } })}
          onEmailCheckedChange={(checked) => setAlerts({ ...alerts, maintenance: { ...alerts.maintenance, emailChecked: checked } })}
          extraFields={
            <>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Typography>Lead Time:</Typography>
                <Input sx={{ width: "40px" }} value={alerts.maintenance.leadTime} onChange={(e) => setAlerts({ ...alerts, maintenance: { ...alerts.maintenance, leadTime: e.target.value } })} />
                <Typography>Days</Typography>
              </Box>
              <Box sx={{ my: "8px" }}>
                <Typography level="body-sm">The lead time determines how many days before the user is notified about planned maintenance.</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Typography>Overdue Time:</Typography>
                <Input sx={{ width: "40px" }} value={alerts.maintenance.overdueTime} onChange={(e) => setAlerts({ ...alerts, maintenance: { ...alerts.maintenance, overdueTime: e.target.value } })} />
                <Typography>Days</Typography>
              </Box>
            </>
          }
        />
        <AlertOption
          mainLabel="Warranty Expiration Alerts"
          subLabel="Show alerts for expiring warranty."
          emailLabel="Email Assets"
          emailDescription="Turn on this option to email out an alert if any alert exists."
          checked={alerts.warrantyExpiration.checked}
          emailChecked={alerts.warrantyExpiration.emailChecked}
          onCheckedChange={(checked) => setAlerts({ ...alerts, warrantyExpiration: { ...alerts.warrantyExpiration, checked } })}
          onEmailCheckedChange={(checked) => setAlerts({ ...alerts, warrantyExpiration: { ...alerts.warrantyExpiration, emailChecked: checked } })}
          extraFields={
            <>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Typography>Lead Time:</Typography>
                <Input sx={{ width: "40px" }} value={alerts.warrantyExpiration.leadTime} onChange={(e) => setAlerts({ ...alerts, warrantyExpiration: { ...alerts.warrantyExpiration, leadTime: e.target.value } })} />
                <Typography>Days</Typography>
              </Box>
            </>
          }
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            justifyContent: "flex-end",
            gap: "15px",
            mx: "35px",
            mt: "40px",
          }}
        >
          <Button
            size="lg"
            sx={{
              color: "#000000",
              borderRadius: "15px",
              padding: "18px 70px",
              background: "#FABC1E",
              "&:hover": {
                background: "#e0a71b",
              },
            }}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            size="lg"
            sx={{
              borderRadius: "15px",
              padding: "18px 70px",
              background: "#000000",
              "&:hover": {
                background: "#333333",
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Setup;