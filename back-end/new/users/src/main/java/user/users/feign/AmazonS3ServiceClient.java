package user.users.feign;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.cloud.openfeign.support.SpringEncoder;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import feign.FeignException;
import feign.codec.Encoder;
import feign.form.spring.SpringFormEncoder;
import feign.hystrix.FallbackFactory;

@FeignClient(name = "s3-bucket-ws", fallbackFactory = AmazonS3FallbackFactory.class, configuration = AmazonS3ServiceClient.MyConfig.class)
public interface AmazonS3ServiceClient {

    @PostMapping(path = "/api/amazon/s3/bucket/picture", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String getPictureUrl(@RequestPart MultipartFile picture);

    @GetMapping(path = "/api/amazon/s3/bucket/picture/delete")
    public boolean deletePicture(@RequestParam String url);

    class MyConfig {
        @Autowired
        private ObjectFactory<HttpMessageConverters> messageConverters;

        @Bean
        public Encoder feignFormEncoder() {
            return new SpringFormEncoder(new SpringEncoder(messageConverters));
        }
    }

}

@Component
class AmazonS3FallbackFactory implements FallbackFactory<AmazonS3ServiceClient> {

    @Override
    public AmazonS3ServiceClient create(Throwable cause) {
        return new AmazonS3ServiceClientFallBack(cause);
    }
}

class AmazonS3ServiceClientFallBack implements AmazonS3ServiceClient {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    private final Throwable cause;

    public AmazonS3ServiceClientFallBack(Throwable cause) {
        this.cause = cause;
    }

    @Override
    public String getPictureUrl(MultipartFile picture) {
        if (cause instanceof FeignException && ((FeignException) cause).status() == 404) {
            logger.error("404 error took plate when getPictureUrl was called with picture name: " + picture.getOriginalFilename()
                    + ". Error message: " + cause.toString());
        } else {
            logger.error("Other error took place " + cause.toString());
        }

        return null;
    }

    @Override
    public boolean deletePicture(String url) {
        if (cause instanceof FeignException && ((FeignException) cause).status() == 404) {
            logger.error("404 error took plate when deletePicture was called with url: " + url
                    + ". Error message: " + cause.toString());
        } else {
            logger.error("Other error took place " + cause.toString());
        }
        return false;
    }

}
