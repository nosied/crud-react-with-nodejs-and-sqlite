import { Breadcrumb } from "react-bootstrap";

export const BreadcrumbNavigation = ({ BreadTitle }) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
      <Breadcrumb.Item active>{BreadTitle}</Breadcrumb.Item>
    </Breadcrumb>
  );
};
