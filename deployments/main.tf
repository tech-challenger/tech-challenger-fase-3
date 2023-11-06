provider "kubernetes" {
  config_path = "~/.kubernetes/deploy.yaml" 
}

resource "kubernetes_deployment" "api" {
  metadata {
    name = "api"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "api"
      }
    }

    template {
      metadata {
        labels = {
          app = "api"
        }
      }

      spec {
        container {
          name  = "api"
          image = "tech-challenge"
          resources {
            limits = {
              memory = "128Mi"
              cpu    = "500m"
            }
          }
          ports {
            container_port = 3000
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "api" {
  metadata {
    name = "api"
  }

  spec {
    selector = {
      app = "api"
    }

    port {
      port = 80
      target_port = 3000
    }
  }
}