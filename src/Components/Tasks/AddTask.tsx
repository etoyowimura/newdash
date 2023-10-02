import { Input, Modal, Form as FormAnt, Select, Button, Upload } from "antd";
import { taskController } from "../../API/LayoutApi/tasks";
import { useEffect, useState } from "react";
import { useCompanyData } from "../../Hooks/Companies";
import { useServiceData } from "../../Hooks/Services";
import { customerController } from "../../API/LayoutApi/customers";
import { UploadOutlined } from '@ant-design/icons';
import { companyController } from "../../API/LayoutApi/companies";
import { teamController } from "../../API/LayoutApi/teams";
import { useTeamData } from "../../Hooks/Teams";
const { Option } = Select;
const AddTask = ({
  open,
  setOpen,
  refetch,
}: {
  open: boolean;
  setOpen(open: boolean): void;
  refetch(): void;
}) => {
  const [form] = FormAnt.useForm();

  const handleCancel = () => {
    setOpen(!open);
  };
  const [fileIds, setFileIds] = useState([]);
  const [companyId, setCompanyId] = useState<any>();
  const [customerId, setCustomerId] = useState<any>(2);
  const [serviceId, setServiceId] = useState<any>();
  const [teamId, setTeamId] = useState<any>(undefined);
  const [customerData, setCustomerData] = useState<any>()
  // -------------------------------------------------
  const CompanyData = useCompanyData('');
  const TeamData = useTeamData('');
  const ServiceData = useServiceData('');
  // -------------------------------------------------
  const CompanyOption: { label: string; value: any }[] | undefined =
    CompanyData?.data?.data?.map(
      (item: { name: string; id: string }) => ({
        label: item?.name,
        value: item?.id,
      })
    );
  useEffect(() => {
    if (companyId !== undefined) {
      customerController.customerByCompany(companyId).then(CustomerData => {
        setCustomerData(CustomerData);
      })
    }
  }, [companyId, customerId])
  const CustomerOption: { label: string; value: any }[] | undefined =
    customerData?.map(
      (item: { name: string; id: string }) => ({
        label: item?.name,
        value: item?.id
      })
    )
  const ServiceOption: { label: string; value: any }[] | undefined =
    ServiceData?.data?.data?.map(
      (item: { title: string; id: string }) => ({
        label: item?.title,
        value: item?.id
      })
    )
  const TeamOption: { label: string; value: any }[] | undefined =
    TeamData?.data?.data?.map(
      (item: { name: string; id: string }) => ({
        label: item?.name,
        value: item?.id
      })
    )
  useEffect(() => {
    if (companyId) {
      companyController.companyOne(companyId)
        .then(data => {
          setTeamId(data.team_id)
        })
    }
  }, [companyId])
  const [teamName, setTeamName] = useState<any>()
  useEffect(() => {
    if (teamId) {
      teamController.teamOne(teamId).then(data => {
        setTeamName(data.name)
      })
    }
  }, [teamId])
  return (
    <div>
      <Modal
        open={open}
        title="Add task"
        okText="Create"
        cancelText="Cancel"
        onCancel={handleCancel}
        onOk={() => {
          form
            .validateFields()
            .then(async (values) => {
              const updatedValues = { ...values };
              updatedValues.attachment_ids = fileIds;
              form.resetFields();
              await taskController.addTaskController(updatedValues);
              setOpen(!open);
              refetch();
            })
            .catch((info) => {
              refetch();
            });
        }}
      >
        <FormAnt
          form={form}
          layout="horizontal"
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
        >
          <FormAnt.Item
            label="Company"
            name="company_id"
            rules={[
              { required: false, message: "Please input company!" },
            ]}
          >
            <Select
              onChange={(value: any) => setCompanyId(value)}
              options={CompanyOption}
            />
          </FormAnt.Item>
          <FormAnt.Item
            label="Customer"
            name="customer_id"
            rules={[
              { required: false, message: "Please input service points!" },
            ]}
          >
            <Select
              onChange={(value: any) => setCustomerId(value)}
              options={CustomerOption}
            />
          </FormAnt.Item>
          <FormAnt.Item
            label="Service"
            name="service_id"
            rules={[
              { required: true, message: "Please select service!" },
            ]}
          >
            <Select
              onChange={(value: any) => setServiceId(value)}
              options={ServiceOption}
            />
          </FormAnt.Item>
          <FormAnt.Item
            label="Assigned to"
            name="assigned_to_id"
            rules={[
              { required: true, message: "Please select one of the teams!" },
            ]}
          >
            <Select
              defaultValue={teamName}
              onChange={(value: any) => setTeamId(value)}
              options={TeamOption}
            />
          </FormAnt.Item>
          <FormAnt.Item
            label="Note"
            name="note"
            rules={[
              { required: false, message: "Please input service points!" },
            ]}
          >
            <Input />
          </FormAnt.Item>
          <FormAnt.Item
            label="Status"
            name="status"
            rules={[
              { required: false, message: "Please input service points!" },
            ]}
          >
            <Select defaultValue="New" style={{ width: 120 }}>
              <Option value="New">New</Option>
              <Option value="Checking">Checking</Option>
              <Option value="Done">Done</Option>
              <Option value="Do PTI">Do PTI</Option>
              <Option value="No need PTI">No need PTI</Option>
            </Select>
          </FormAnt.Item>
        </FormAnt>
        <FormAnt>
          <FormAnt.Item
            label="File"
            name="attachment"
          >
            <Upload.Dragger
              name="file"
              customRequest={({ file, onSuccess }: any) => {
                const formData = new FormData();
                formData.append('file', file);
                taskController.addTaskFile(formData)
                  .then((response) => {
                    const fileId = response.id;
                    setFileIds((prevFileIds): any => [...prevFileIds, fileId]);
                    onSuccess();
                    const updatedValues = form.getFieldsValue();
                    updatedValues.attachment_ids = [...updatedValues.attachment_ids, fileId];
                    form.setFieldsValue(updatedValues);
                  })
                  .catch((error) => {
                    onSuccess(error);
                  });
              }}
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Upload.Dragger>
          </FormAnt.Item>
        </FormAnt>
      </Modal>
    </div>
  );
};

export default AddTask;