locals {
  namespace = "crypto-combat-synth-builder-${var.environment}"

  lambda_zip_path = "../lambda.zip"

  tags = {
    Project = "crypto-combat"
    CreatedWith = "Terraform"
    Repo = "https://github.com/mick-roper/crypto-combat/server/services/synth-builder"
    BuildNumber = "${var.build_number}"
  }
}