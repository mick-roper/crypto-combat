resource "aws_lambda_function" "synth_builder" {
  function_name = "${local.namespace}-fn"
  filename = "${local.lambda_zip_path}"
  source_code_hash = "${base64sha256("${local.lambda_zip_path}")}"
  runtime = "nodejs8.10"
  handler = "src/index.handler"
}

resource "aws_lambda_alias" "build_number" {
  function_name = "${aws_lambda_function.synth_builder.function_name}"
  name = "build-${var.build_number}"
  function_version = "${var.build_number}"
}