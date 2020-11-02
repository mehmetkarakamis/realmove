package amazon.s3.bucket.s3bucket;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class AmazonS3BucketApplication {

	public static void main(String[] args) {
		SpringApplication.run(AmazonS3BucketApplication.class, args);
	}

}
