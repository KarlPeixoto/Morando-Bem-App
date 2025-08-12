package com.neki.sistemaskill;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(
    info = @Info(
        title = "Sistema Skill API",
        version = "1.0.0",
        description = "API para gerenciamento de usuários e suas habilidades (skills)",
        contact = @Contact(
            name = "Mateus Karl Peixoto",
            email = "mateus@example.com"
        ),
        license = @License(
            name = "MIT License",
            url = "https://opensource.org/licenses/MIT"
        )
    ),
    servers = {
        @Server(
            description = "Local Environment",
            url = "http://localhost:8080"
        )
    }
)
public class SistemaskillApplication {

	public static void main(String[] args) {
		SpringApplication.run(SistemaskillApplication.class, args);
	}

}
