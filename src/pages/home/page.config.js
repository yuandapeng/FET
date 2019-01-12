import request from "@/utils/request";
export default function () {
  const { state, props } = this;
  return {


    formConfig: {
      onFormSubmit: async (values) => {
        const res0 = await request.get("users", values);
        const res1 = await request.get("GET", values);
        const res2 = await request.post("POST", values);
        const res3 = await request.delete("DELETE", values);
        const res4 = await request.put("PUT", values);
        console.log(res0,res1,res2,res3,res4);
      },
      formItems: [
        {
          type: "input",
          key: "input",
          label: "input"
        },
        {
          type: "uploadPicker",
          key: "uploadPicker",
          label: "uploadPicker",
          tabs: [{
            width: 100,
            height: 300,
            attchments: [{
              id: 1,
              url: "xxx.png"
            }]
          }],
          //return all checked pickers and upload 
          onChange: (pickers) => {

          },
          //return  upload result
          onUploadChange: () => {

          }
        }
      ]
    }

  }

}