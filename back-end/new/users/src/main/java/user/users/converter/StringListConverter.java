package user.users.converter;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class StringListConverter implements AttributeConverter<List<String>, String> {

  private static ObjectMapper mapper;

  static {
    // To avoid instantiating ObjectMapper again and again.
    mapper = new ObjectMapper();
  }

  @Override
  public String convertToDatabaseColumn(List<String> data) {
    if (null == data) { 
      // You may return null if you prefer that style
      return null;
    }
    
    try {
      return mapper.writeValueAsString(data);
      
    } catch (IOException e) {
      throw new IllegalArgumentException("Error converting map to JSON", e);
    }
  }

  @Override
  public List<String> convertToEntityAttribute(String s) {
    if (null == s) {
      // You may return null if you prefer that style
      return new ArrayList<>();
    }

    try {
      return mapper.readValue(s, new TypeReference<List<String>>() {});
      
    } catch (IOException e) {
      throw new IllegalArgumentException("Error converting JSON to map", e);
    }
  }
}
