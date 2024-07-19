<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class createPersonRequests extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'fullname' => 'required|min:3|max:255',
            'dni' => 'required|digits_between:8,8|numeric|unique:people,dni',
            'genero' => 'required|in:Masculino,Femenino|max:255',
            'city' => 'required|max:255',
            'acceptTerms' => 'required|boolean',
        ];
    }
}
