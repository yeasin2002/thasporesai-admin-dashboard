import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import HelpSupportTable from "./help-support-table";
import SettingsPage from "./settingsMain";
import StatusFilterDropdown from "./status-filter";

export const Settings = () => {
  return (
    <div>
      <StatusFilterDropdown />
      <div>
        <Tabs>
          <TabList className="my-6 flex gap-4">
            <Tab className="react-tabs__tab--selected:font-bold text-[18px] text-[#13527F]">
              Setting
            </Tab>

            <Tab className="react-tabs__tab--selected:font-bold text-[18px] tracking-tight text-[#13527F]">
              Help and Support
            </Tab>
          </TabList>

          <TabPanel>
            <SettingsPage />
          </TabPanel>
          <TabPanel>
            <HelpSupportTable />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};
