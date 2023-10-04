import { Input, Modal, Form as FormAnt, Select, Button, Upload } from "antd";
import { taskController } from "../../API/LayoutApi/tasks";
import { useEffect, useState } from "react";
import { useCompanyData } from "../../Hooks/Companies";
import { useServiceData } from "../../Hooks/Services";
import { customerController } from "../../API/LayoutApi/customers";
import { UploadOutlined, SearchOutlined } from '@ant-design/icons';
import { companyController } from "../../API/LayoutApi/companies";
import { teamController } from "../../API/LayoutApi/teams";
import { useTeamData } from "../../Hooks/Teams";
import instance from "../../API/api";
const { Option } = Select;
const AddTask = ({
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
  const [fileIds, setFileIds] = useState([]);
  const [companyName, setCompanyName] = useState<string>('');
  const [customerName, setCustomerName] = useState<any>('');
  const [serviceId, setServiceId] = useState<any>();
  const [teamId, setTeamId] = useState<any>(undefined);
  const [characters, setCharacters] = useState<any>([])
  const [customerData, setCustomerData] = useState<any>([])
  const ServiceData = useServiceData('');
  const TeamData = useTeamData('')
  const [companyId, setCompanyId] = useState<any>();
  const [options, setOptions] = useState<any>();
  const [cusOptions, setCusOptions] = useState<any>();
  const [teamName, setTeamName] = useState<any>()

  const ServiceOption: { label: string; value: any }[] | undefined =
    ServiceData?.data?.data?.map(
      (item: { title: string; id: string }) => ({
        label: item?.title,
        value: item?.id
      })
    )
  // ---------------------------------------------

  type Data = {
    data?: {
      data: Array<any>;
      count: number | string;
    };
    isLoading?: boolean;
    refetch?: any;
    isFetching?: boolean;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data }: Data = await instance(`companies/?name=${companyName}`)
        setCharacters(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [companyName])
  useEffect(() => {
    const CompanyOption: { label: string; value: any }[] | undefined =
      characters?.map(
        (item: { name: string; id: string }) => ({
          label: item?.name,
          value: item?.id,
        })
      );
    setOptions(CompanyOption)
  }, [characters])
  // const [teamOptions, setTeamOptions] = useState<any>();
  // useEffect(() => {
  //   if (companyId) {
  //     companyController.companyOne(companyId).then(data => {
  //       const team = data.team_id;
  //       setTeamId(team)
  //     })
  //   }
  // }, [companyId])
  // useEffect(() => {
  //   if(teamId !== undefined){
  //     teamController.teamOne(teamId).then(data => {
  //       const options = {
  //         label: data.name,
  //         value: data.id
  //       }
  //       const opt = [options]
  //       setTeamOptions(opt)
  //     })
  //   }
  // }, [teamId])

  useEffect(() => {
    if (companyId !== undefined) {
      customerController.customerByCompany(companyId, customerName).then(data => {
        setCustomerData(data)
      })
    }
  }, [companyId])

  useEffect(() => {
    if (companyId !== undefined) {
      const fetchData = async () => {
        try {
          const { data }: Data = await instance(`customers-by-company/${companyId}/?name=${customerName}`)
          setCustomerData(data)
        } catch (error) {
          console.error(error)
        }
      }
      fetchData()
    }
  }, [customerName])

  useEffect(() => {
    const CustomerOption: { label: string; value: any }[] | undefined =
      customerData?.map(
        (item: { name: string; id: string }) => ({
          label: item?.name,
          value: item?.id
        })
      )
    setCusOptions(CustomerOption)
  }, [customerData])


  const teamOptions: { label: string; value: any }[] | undefined =
      TeamData?.data?.data.map(
        (item: { name: string; id: string }) => ({
          label: item?.name,
          value: item?.id
        })
      )

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
            label="Company"
            name="company_id"
            rules={[
              { required: false, message: "Please input company!" },
            ]}
          >
            <Select
              showSearch
              placeholder="Search Company"
              onSearch={(value: any) => setCompanyName(value)}
              options={options}
              value={companyName}
              filterOption={false}
              autoClearSearchValue={false}
              allowClear
              onChange={(value: any) => setCompanyId(value)}
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
              showSearch
              placeholder="Search Customer"
              onSearch={(value: any) => setCustomerName(value)}
              options={cusOptions}
              value={customerName}
              filterOption={false}
              autoClearSearchValue={false}
              allowClear
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
          {/* <FormAnt.Item
            label="Assigned to"
            name="assigned_to_id"
            rules={[
              { required: true, message: "Please select one of the teams!" },
            ]}
          >
            <Select options={teamOptions}/>
          </FormAnt.Item> */}
          <FormAnt.Item
            label="Assigned to"
            name="assigned_to_id"
            rules={[
              { required: true, message: "Please select one of the teams!" },
            ]}
          >
            <Select options={teamOptions}/>
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