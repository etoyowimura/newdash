import { Modal } from "antd";

const Success = ({
  open,
  setOpen,
  email,
}: {
  email: string;
  open: boolean;
  setOpen(open: boolean): void;
}) => {
  const handleCancel = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Modal open={open} title="Success!" onCancel={handleCancel} footer={null}>
        <p>
            A password-reset-link has been sent to your email! To reset your
          password you will need to follow the link provided in the message. The
          letter was sent to:{" "}
          <span style={{ textDecoration: "underline" }}>{email}</span>
          <br />
          <br />
            If for some reason you do not reset your password, within three days,
          the link sent to your e-mail will expire. You can request for
          control letter again.
        </p>
      </Modal>
    </div>
  );
};

export default Success;
