import * as yup from "yup";
const mobileRegEx = /^9\d{9}$/;

const paymentFormSchema = yup.object({
  name: yup
    .string()
    .required("وارد کردن نام اجباری است")
    .min(4, "حداقل 4 حرف وارد شود")
    .max(100, "حداکثر 100 حرف وارد شود"),
  mobile: yup
    .string()
    .matches(mobileRegEx, "فرمت وارد شده صحیح نیست")
    .required("وارد کردن شماره تلفن اجباری است")
    .min(10, "حداقل 10 رقم وارد شود")
    .max(10, "حداکثر 10 رقم وارد شود"),
  province: yup.string().required("لطفا استان خود را انتخاب کنید"),
  city: yup.string().required("لطفا شهر خود را انتخاب کنید"),
  address: yup
    .string()
    .required("وارد کردن نشانی اجباری است")
    .max(120, "حداکثر 120 حرف وارد شود"),
});
export default paymentFormSchema