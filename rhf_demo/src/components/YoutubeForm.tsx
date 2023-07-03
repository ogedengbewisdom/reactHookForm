import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools"
import { Fragment } from "react";

type FormValues = {
  username: string,
  email: string,
  channel: string

}

let rerender = 0;
export const YoutubeForm = () => {
  const form = useForm<FormValues>();
  const {register, control, handleSubmit, formState} = form;

  const {errors, touchedFields} = formState


  const controlInput = touchedFields.username ? "errorInput" : "input"
  

  // useEffect(() => {
  //   console.log("CHEKING RERENDERING!")
  // }, [])

  const submitHandler = (data: FormValues) => {
    console.log("submitted", data)
  }
  rerender++
  
  return (
    <Fragment>
      <h1>YouTube Form ({rerender/2})</h1>
      <form onSubmit={handleSubmit(submitHandler)} noValidate>
        <div className='form-control'>
          <label htmlFor='username'>Username</label>
          <input className={controlInput} type='text' id='username' {...register("username", {
            required: {
            value: true,
            message: "Enter a valid name"
          },
          validate: (fieldValue) => fieldValue.trim().length > 5 
          })}/>
          {errors &&<p className="error">{errors.username?.message}</p>}
        </div>

        <div className="form-control">
          <label htmlFor='email'>Email</label>
          <input className="input" type='text' id='email' {...register("email", {
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
          <input className="input" type='text' id='channel' {...register("channel", {required: "Required channel"})}/>
          {errors &&<p className="error">{errors.channel?.message}</p>}
        </div>
          <button>Submit</button>
      </form>
      <DevTool control={control} />
    </Fragment>
  )
}
