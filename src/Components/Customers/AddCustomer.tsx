import { Input, Modal, Form as FormAnt, Select } from "antd";
import { customerController } from "../../API/LayoutApi/customers";
import { useEffect, useState } from "react";
import instance from "../../API/api";

const AddCustomer = ({  
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
  type Data = {
    data?: {
      data: Array<any>;
      count: number | string;
    };
    isLoading?: boolean;
    refetch?: any;
    isFetching?: boolean;
  };
  const [companyName, setCompanyName] = useState<string>('');
  const [options, setOptions] = useState<any>();
  const [characters, setCharacters] = useState<any>([])
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
  return (
    <div>
      <Modal
        open={open}
        title="Add customer"
        okText="Create"
        cancelText="Cancel"
        onCancel={handleCancel}
        onOk={() => {
          form
            .validateFields()
            .then(async (values) => {
              form.resetFields();
              await customerController.addCustomerController(values);
              setOpen(!open);
              window.location.reload();
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
              { required: true, message: "Please input Name!" },
            ]}
          >
            <Input />
          </FormAnt.Item>
          <FormAnt.Item
            label="Role"
            name="profession"
            rules={[
              { required: false, message: "Please input Role!" },
            ]}
          > 
            <Input defaultValue='driver' />
          </FormAnt.Item>
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
            />
          </FormAnt.Item>
        </FormAnt>
      </Modal>
    </div>
  );
};

export default AddCustomer;