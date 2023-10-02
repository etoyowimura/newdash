import { Input, Modal, Form as FormAnt, Switch, Select } from "antd";
import { companyController } from "../../API/LayoutApi/companies";
import { useEffect, useState } from "react";
import { useTeamData } from "../../Hooks/Teams";
import { teamController } from "../../API/LayoutApi/teams";

const AddCompany = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen(open: boolean): void;
}) => {
  const [form] = FormAnt.useForm();

  const handleCancel = () => {
    setOpen(!open);
  };
  const [teamId, setTeamId] = useState<any>(undefined);
  const TeamData = useTeamData(teamId);
  const TeamOption: { label: string; value: any }[] | undefined =
  TeamData?.data?.data?.map(
    (item: { name: string; id: string }) => ({
      label: item?.name,
      value: item?.id
    })
  )
  return (
    <div>
      <Modal
        open={open}
        title="Add Company"
        okText="Create"
        cancelText="Cancel"
        onCancel={handleCancel}
        onOk={() => {
          form
            .validateFields()
            .then(async (values) => {
              form.resetFields();
              await companyController.addCompanyController(values);
              setOpen(!open);
            })
        }}
      >
        <FormAnt
          form={form}
          layout="horizontal"
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
        >
          <FormAnt.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter company name!" },
            ]}
          >
            <Input />
          </FormAnt.Item>
          <FormAnt.Item
            label="Owner"
            name="owner"
            rules={[
              { required: true, message: "Please input owner name!" },
            ]}
          >
            <Input />
          </FormAnt.Item>
          <FormAnt.Item
            label="Team"
            name="team_id"
            rules={[
              { required: true, message: "Please input owner name!" },
            ]}
          >
            <Select
              onChange={(value: any) => setTeamId(value)}
              options={TeamOption}
            />
          </FormAnt.Item>
          <FormAnt.Item
            label="Is Active"
            name="is_active"
            rules={[{ required: false, message: "Please input company status!" }]}
          >
            <Switch defaultChecked={true} />
          </FormAnt.Item>
        </FormAnt>
      </Modal>
    </div>
  );
};

export default AddCompany;
