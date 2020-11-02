package amazon.s3.bucket.s3bucket.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import amazon.s3.bucket.s3bucket.amazon.AmazonClient;


import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("api/amazon/s3/bucket")
public class S3Controller {

    @Autowired
    AmazonClient amazonClient;

    public static final List<String> contentTypes = Arrays.asList("image/png", "image/jpeg","image/jpg");

    @PostMapping("/pictures")
    public Set<String> getPicturesUrls(@RequestPart MultipartFile[] pictures){

        Set<String> urls = new HashSet<>();

        if(pictures != null) {
            for (int j = 0; j < pictures.length; j++) {

                String imageType = pictures[j].getContentType(); //gets whether image jpg,png or gif.

                if (contentTypes.contains(imageType)) {
                    urls.add(amazonClient.uploadFile(pictures[j]));
                }
            }
            return urls;
        }
        return null;
        

    }

    @PostMapping("/picture")
    public String getPictureUrl(@RequestPart MultipartFile picture){
        System.out.println(picture.getOriginalFilename());
        if(picture != null) {
            String imageType = picture.getContentType(); //gets whether image jpg,png or gif.

                if (contentTypes.contains(imageType)) {
                    return amazonClient.uploadFile(picture);
                }
        }
        return "Image did not found";
    }

    @GetMapping("/picture/delete")
    public boolean deletePicture(@RequestParam String url){

        if(url == null)
            return false;
        
        amazonClient.deleteFileFromS3Bucket(url);

        return true;

    }

    @GetMapping("/pictures/delete")
    public boolean deletePictures(@RequestParam List<String> urls){

        if(urls == null)
            return false;
        
        for (String myUrls : urls) {
            amazonClient.deleteFileFromS3Bucket(myUrls);
        }
        
        return true;

    }
    
}