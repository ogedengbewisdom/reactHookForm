import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools"
import { Fragment } from "react";

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: [
    {numbers: string}
  ]
}

let rerender = 0;
export const YoutubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "Rash",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: ""
      },
      phoneNumbers: ["", ""],
      phNumbers: [{numbers: ""}]
    }
  });

  // const form = useForm<FormValues>({
  //   defaultValues: async () => {
  //     const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  //     const data = await response.json();
  //     return {
  //       username: data.name,
  //       email: data.email,
  //       channel: data.website
  //     }
  //   }
  // });
  const {register, control, handleSubmit, formState} = form;

  const { errors } = formState


  // useEffect(() => {
  //   console.log("CHEKING RERENDERING!")
  // }, [])

  const submitHandler = (data: FormValues) => {
    console.log(data.phoneNumbers[1])
  }
  rerender++
  
  return (
    <Fragment>
      <h1>YouTube Form ({rerender/2})</h1>
      <form onSubmit={handleSubmit(submitHandler)} noValidate>
        <div className='form-control'>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' {...register("username", {
            required: {
            value: true,
            message: "Enter a valid name"
          },
          validate: (fieldValue) => fieldValue.trim().length > 5 || "name must be greater than 5"
          })}/>
          {errors &&<p className="error">{errors.username?.message}</p>}
        </div>

        <div className="form-control">
          <label htmlFor='email'>Email</label>
          <input type='text' id='email' {...register("email", {
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email format"
            },
            validate: {
              adminValidate: (fieldValue) => fieldValue !== "admin@gmail.com" || "email preserved",
              yahooValidate: (fieldValue) => !fieldValue.endsWith("@yahoo.com") || "yahoo not in use"
            }
          })} />
          {errors &&<p className="error">{errors.email?.message}</p>}
        </div>

        <div className="form-control">
          <label htmlFor='channel'>Channel</label>
          <input type='text' id='channel' {...register("channel", {required: "Required channel"})}/>
          {errors &&<p className="error">{errors.channel?.message}</p>}
        </div>

        <div className="form-control">
          <label htmlFor='twitter'>Twitter</label>
          <input type='text' id='twitter' {...register("social.twitter", {required: "Required twitter"})}/>
          {errors &&<p className="error">{errors.social?.twitter?.message}</p>}
        </div>

        <div className="form-control">
          <label htmlFor='facebook'>Facebook</label>
          <input type='text' id='facebook' {...register("social.facebook", {required: "Required facebook"})}/>
          {errors &&<p className="error">{errors.social?.facebook?.message}</p>}
        </div>

        <div className="form-control">
          <label htmlFor='primary-number'>Phone 1</label>
          <input type='text' id='primary-number' {...register("phoneNumbers.0", {required: "Required primary-number"})}/>
          {errors &&<p className="error">{errors.phoneNumbers?.[0]?.message}</p>}
        </div>

        <div className="form-control">
          <label htmlFor='secondary-number'>Phone 2</label>
          <input type='text' id='secondary-number' {...register("phoneNumbers.1", {required: "Required secondary-number"})}/>
          {errors &&<p className="error">{errors.phoneNumbers?.[1]?.message}</p>}
        </div>
          <button>Submit</button>
      </form>
      <DevTool control={control} />
    </Fragment>
  )
}
