import { Input, Modal, Form as FormAnt, Select, Upload } from "antd";
import { updateController } from "../../API/LayoutApi/update";
import { useEffect, useState } from "react";
import { customerController } from "../../API/LayoutApi/customers";
import { UploadOutlined } from '@ant-design/icons';
import { useTeamData } from "../../Hooks/Teams";
import instance from "../../API/api";
import { taskController } from "../../API/LayoutApi/tasks";
const { Option } = Select;
const AddUpdate = ({
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
  const [fileIds, setFileIds] = useState([])
  const [companyName, setCompanyName] = useState<string>('')
  const [customerName, setCustomerName] = useState<any>('')
  const [characters, setCharacters] = useState<any>([])
  const [customerData, setCustomerData] = useState<any>([])
  const TeamData = useTeamData('')
  const [companyId, setCompanyId] = useState<any>()
  const [options, setOptions] = useState<any>()
  const [cusOptions, setCusOptions] = useState<any>()

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
        const { data }: any = await instance(`companies/?name=${companyName}`)
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


  const [imgname, setImgname] = useState<any>([]);
  function handlePaste(event: any) {
    // Обработка вставки из буфера обмена
    const clipboardData = event.clipboardData || window.Clipboard;
    if (clipboardData && clipboardData.items.length > 0) {
      const clipboardItem = clipboardData.items[0];
      if (clipboardItem.kind === "file") {
        const file = clipboardItem.getAsFile();
        const formData = new FormData();
        formData.append("file", file);
        taskController
          .addTaskFile(formData)
          .then((response) => {
            const fileId = response.id;
            const n = [response.file];
            setImgname((prev: any) => [...prev, ...n]);
            setFileIds((prevFileIds): any => [...prevFileIds, fileId]);
            const updatedValues = form.getFieldsValue();
            updatedValues.attachment_ids = [
              ...updatedValues.attachment_ids,
              fileId,
            ];
            form.setFieldsValue(updatedValues);
          })
          .catch((error) => {
            // Обработка ошибки при вставке из буфера обмена
          });
      }
    }
  }

  return (
    <div onPaste={(event) => handlePaste(event)}>
      <Modal
        open={open}
        title="Add update"
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
              await updateController.addUpdateController(updatedValues);
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
            label="Note"
            name="note"
            rules={[
              { required: true, message: "Make note!" },
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
              <Option value="In Progress">In Progress</Option>
              <Option value="Done">Done</Option>
              <Option value="Paper">Paper</Option>
              <Option value="Setup">Setup</Option>
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
              multiple={true}
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
                <UploadOutlined  style={{color:"#36cfc9"}}/>
              </p>
              <p className="ant-upload-text" style={{color: '#36cfc9'}}>Click or drag file to this area to upload</p>
            </Upload.Dragger>
            <p>{imgname.join(",\n")}</p>
          </FormAnt.Item>
        </FormAnt>
      </Modal>
    </div>
  );
};

export default AddUpdate;