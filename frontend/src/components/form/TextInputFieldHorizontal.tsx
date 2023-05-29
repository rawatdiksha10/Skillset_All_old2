import { Col, Form, Row } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextInputFieldTextInputFieldHorizontalProps {
    name: string,
    label?: string,
    labelLength?: number,
    itemLength?: number,
    register: UseFormRegister<any>,
    registerOptions?: RegisterOptions,
    error?: FieldError,
    [x: string]: any,
}

const TextInputFieldHorizontal = ({ name, label, labelLength = 2, itemLength = 10, register, registerOptions, error, ...props }: TextInputFieldTextInputFieldHorizontalProps) => {
    return (
        <Form.Group className="mb-3" controlId={name + "-input"}>
            <Row>
                {
                    label && <Form.Label column style={{paddingRight: 0}} sm={labelLength}>{label}</Form.Label>
                }
                <Col sm={itemLength}>
                    <Form.Control
                        {...props}
                        {...register(name, registerOptions)}
                        isInvalid={!!error}
                    />
                    <Form.Control.Feedback type="invalid">
                        {error?.message}
                    </Form.Control.Feedback>
                </Col>
            </Row>
        </Form.Group>
    );
}

export default TextInputFieldHorizontal;