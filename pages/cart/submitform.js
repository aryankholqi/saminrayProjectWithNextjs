import React, { useEffect, useState } from "react";
import { Form, Input, Label, Row, Col } from "reactstrap";
import Select from "react-select";
import { getAllProvinces, getCenterOfProvince } from "@/api/provinces";
import { useFormik } from "formik";
import paymentFormSchema from "@/Schema/paymentFormSchema";
import { getSession, signIn } from "next-auth/react";

export default function SubmitCheckout({ provinces }) {
  const [isLoading, setIsLoading] = useState(true);
  const [cityOption, setCityOption] = useState([]);
  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();
      if (!session) {
        signIn();
      } else {
        setIsLoading(false);
      }
    };
    securePage();
  }, []);
  const provinceOptions = provinces.map((province) => ({
    value: province.name,
    label: province.name,
    id: province.id,
  }));
  const initialValues = {
    name: "",
    mobile: "",
    province: "",
    city: "",
    address: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: paymentFormSchema,
    onSubmit: (values) => submitFormHandler(values),
  });
  const submitFormHandler = (values) => {
    console.log(values);
  };
  const changeProvince = async (e) => {
    const centerOfProvince = await getCenterOfProvince(e.id);
    const options = [
      {
        value: centerOfProvince.data.center,
        label: centerOfProvince.data.center,
      },
    ];
    setCityOption(options);
  };
  if (isLoading) {
    return <h2>لطفا منتظر بمانید...</h2>;
  }
  return (
    <div className="container">
      <h1 className="text-xl font-medium">ثبت مشخصات خریدار</h1>
      <Form className="mt-5" onSubmit={formik.handleSubmit}>
        <Row className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-col-4">
          <Col className="mb-5">
            <Label for="name">نام خریدار</Label>
            <br />
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="نام خود را وارد کنید"
              className="outline rounded-md p-1.5 w-2/3"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name && (
              <div className="text-red-600">{formik.errors.name}</div>
            )}
          </Col>
          <Col className="mb-5">
            <Label for="mobile">شماره تماس</Label>
            <br />
            <Input
              type="tel"
              name="mobile"
              id="mobile"
              placeholder="شماره تماس خود را وارد کنید"
              className="outline rounded-md p-1.5 w-2/3"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.mobile && formik.touched.mobile && (
              <div className="text-red-600">{formik.errors.mobile}</div>
            )}
          </Col>
          <Col className="mb-5">
            <Label for="province">استان</Label>
            <br />
            <Select
              options={provinceOptions}
              className="w-2/3"
              name="province"
              placeholder="لطفا استان خود را انتخاب کنید"
              onChange={(e) => {
                formik.setFieldValue("province", e.value);
                changeProvince(e);
              }}
              onBlur={formik.handleBlur}
            />
            {formik.errors.province && formik.touched.province && (
              <div className="text-red-600">{formik.errors.province}</div>
            )}
          </Col>
          <Col className="mb-5">
            <Label for="city">شهرستان</Label>
            <br />
            <Select
              options={cityOption}
              placeholder="لطفا شهر خود را انتخاب کنید"
              className="w-2/3"
              name="city"
              isDisabled={cityOption.length === 0}
              onChange={(e) => formik.setFieldValue("city", e.value)}
              onBlur={formik.handleBlur}
            />
            {formik.errors.city && formik.touched.city && (
              <div className="text-red-600">{formik.errors.city}</div>
            )}
          </Col>
          <Col>
            <Label for="address">نشانی</Label>
            <br />
            <textarea
              name="address"
              id="address"
              rows="5"
              className="outline rounded-md p-1.5 w-2/3"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.errors.address && formik.touched.address && (
              <div className="text-red-600">{formik.errors.address}</div>
            )}
          </Col>
        </Row>
        <Row>
          <button
            className="px-4 py-2 bg-primary text-white rounded-xl"
            type="submit"
          >
            ثبت فرم
          </button>
        </Row>
      </Form>
    </div>
  );
}

export async function getStaticProps() {
  const response = await getAllProvinces();
  const data = response.data;
  return {
    props: {
      provinces: data,
    },
  };
}
