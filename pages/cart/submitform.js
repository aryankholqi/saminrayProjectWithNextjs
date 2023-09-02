import React, { useEffect, useState } from "react";
import { Form, Input, Label, Row, Col } from "reactstrap";
import Select from "react-select";
import { getAllProvinces, getCenterOfProvince } from "src/api/provinces";
import { useFormik } from "formik";
import paymentFormSchema from "src/Schema/paymentFormSchema";
import { getSession, signIn } from "next-auth/react";
import { useGetAllProvinces } from "@/src/querries/useProvinces";
import Map from "@/src/components/Map/index";

export default function SubmitCheckout({ provinces }) {
  const [isLoading, setIsLoading] = useState(true);

  const [cityOption, setCityOption] = useState([]);

  const getAllProvinces = useGetAllProvinces(provinces);

  useEffect(() => {
    console.log(typeof window);
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

  const provinceOptions = getAllProvinces.data.map((province) => ({
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
    lat:"",
    lang:"",
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
    formik.values.province = e.value;

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
    return (
      <div className="container">
        <h2 className="text-xl font-medium">لطفا منتظر بمانید...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="text-xl font-medium text-center">ثبت مشخصات خریدار</h1>
      <hr className="w-1/2 mx-auto text-primary my-5" />
      <Form onSubmit={formik.handleSubmit}>
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
              onChange={(e) => {
                formik.setFieldValue("city", e.value);
              }}
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
        <h2 className="text-center text-xl font-medium mt-16 mb-5">همینطور میتونی از روی نقشه محل ارسال رو مشخص کنی:</h2>
        <div className="h-96">
          <Map formik={formik}/>
        </div>
        <Row className="mt-5">
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
