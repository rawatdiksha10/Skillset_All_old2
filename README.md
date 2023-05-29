# Skillset_All

link - https://rawatdiksha10.github.io/Skillset_All_old2/


https://account.mongodb.com/account/login

https://cloud.mongodb.com/v2/643675f2eaba442810b52a1a#/metrics/replicaSet/6436770466a0223ddcca9866/explorer/SkillsetDB/users/find

# Usage for TextInputField & PasswordInputField
import PasswordInputField from './form/PasswordInputField2Horizontal';  
import TextInputField from "./form/TextInputFieldHorizontal";

```
<Form onSubmit={handleSubmit(onSubmit)}>
	<TextInputField
		name="userid"
		label="ユーザーID"
		// labelLength={2}
		// itemLength={10}
		type="text"
		placeholder="ユーザーID"
		register={register}
		registerOptions={{ required: "Required" }}
		error={errors.userid}
	/>
	<PasswordInputField
		name="password"
		label="パスワード"
		// labelLength={2}
		// itemLength={10}
		placeholder="パスワード"
		register={register}
		registerOptions={{ required: "Required" }}
		error={errors.password}
	/>

	<Button
		type="submit"
		disabled={isSubmitting}>
		Log In
	</Button>
</Form>
```
